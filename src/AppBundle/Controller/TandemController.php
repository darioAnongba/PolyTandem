<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/tandem")
 */
class TandemController extends Controller
{
    /**
     * @Route("/live", name="tandem-live")
     */
    public function tandemLiveAction(Request $request)
    {
        $learn = $request->request->get('learn');

        $repo = $this->getDoctrine()->getManager()->getRepository('AppBundle:Discussion');
        $discussion = $repo->findOneBy([
            'guest' => null,
            'hostSpeaks' => $learn,
            'hostLearns' => $this->getUser()->getLanguage()
        ]);

        if($discussion !== null)
        {
            $discussion->setGuest($this->getUser());

            return $this->render('tandem/tandem-live.html.twig', [
                'discussion' => $discussion,
            ]);
        }

        return $this->render('tandem/tandem-live.html.twig', [
            'discussion' => $discussion,
            'learn' => $learn
        ]);
    }

}